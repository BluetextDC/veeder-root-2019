<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/custom/veeder/templates/paragraph/paragraph--3-column-taxonomy-listing.html.twig */
class __TwigTemplate_82bfab5eec03bf1477d159a0bce5d837bbf49e1e21e862bc690383915995dc2e extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
            'paragraph' => [$this, 'block_paragraph'],
            'content' => [$this, 'block_content'],
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 42, "block" => 55, "if" => 59];
        $filters = ["clean_class" => 50, "escape" => 56, "replace" => 56, "trim" => 56, "render" => 59];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'block', 'if'],
                ['clean_class', 'escape', 'replace', 'trim', 'render'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 42
        $context["paragraph_id"] = ("paragraph-" . $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["paragraph"] ?? null), "id", [], "method")));
        // line 45
        $context["classes"] = [0 => "paragraph", 1 => "related-sol-sec", 2 => "space-medium", 3 =>         // line 49
($context["paragraph_id"] ?? null), 4 => ("paragraph--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 50
($context["paragraph"] ?? null), "bundle", [])))), 5 => ((        // line 51
($context["view_mode"] ?? null)) ? (((\Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["paragraph"] ?? null), "bundle", []))) . "--") . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["view_mode"] ?? null))))) : (""))];
        // line 54
        echo "
";
        // line 55
        $this->displayBlock('paragraph', $context, $blocks);
    }

    public function block_paragraph($context, array $blocks = [])
    {
        // line 56
        echo "  <section";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method")), "html", null, true);
        echo " style=\"background-color: ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_3_column_taxonomy_bg_color", []), 0, []), "color", [])), "html", null, true);
        echo ";\" id=\"";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, twig_replace_filter(twig_trim_filter($this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_3_column_taxonomy_cta_id", []), 0, []), "value", []))), " ", "-"), "html", null, true);
        echo "\">
    <div class=\"container\" style=\"color: ";
        // line 57
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["paragraph"] ?? null), "field_3_column_taxonomy_head_col", []), 0, []), "color", [])), "html", null, true);
        echo "\">
      ";
        // line 58
        $this->displayBlock('content', $context, $blocks);
        // line 68
        echo "    </div>
  </section>
";
    }

    // line 58
    public function block_content($context, array $blocks = [])
    {
        // line 59
        echo "        ";
        if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_3_column_taxonomy_heading", [])))) {
            // line 60
            echo "          <div class=\"heading text-center inherit-color\">
            <h2>
              ";
            // line 62
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_3_column_taxonomy_heading", []), 0, [])), "html", null, true);
            echo "
            </h2>
          </div>
        ";
        }
        // line 66
        echo "        ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_3_column_taxonomy_view", [])), "html", null, true);
        echo "
      ";
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/paragraph/paragraph--3-column-taxonomy-listing.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  111 => 66,  104 => 62,  100 => 60,  97 => 59,  94 => 58,  88 => 68,  86 => 58,  82 => 57,  73 => 56,  67 => 55,  64 => 54,  62 => 51,  61 => 50,  60 => 49,  59 => 45,  57 => 42,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/paragraph/paragraph--3-column-taxonomy-listing.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\paragraph\\paragraph--3-column-taxonomy-listing.html.twig");
    }
}
