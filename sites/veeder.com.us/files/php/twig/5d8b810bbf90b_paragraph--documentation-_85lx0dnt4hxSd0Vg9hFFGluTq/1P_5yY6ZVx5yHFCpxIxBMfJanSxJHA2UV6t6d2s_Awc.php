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

/* themes/custom/veeder/templates/paragraph/paragraph--documentation-section.html.twig */
class __TwigTemplate_b5246bd4ca9f3a17ef1f2a80aaae3a2d09c5debeeb15f6c56963cb894ea0e788 extends \Twig\Template
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
        $tags = ["set" => 40, "for" => 50, "block" => 59, "if" => 62];
        $filters = ["clean_class" => 43, "length" => 48, "merge" => 56, "render" => 62, "escape" => 63];
        $functions = ["range" => 50];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'for', 'block', 'if'],
                ['clean_class', 'length', 'merge', 'render', 'escape'],
                ['range']
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
        // line 40
        $context["classes"] = [0 => "paragraph", 1 => ("paragraph" . $this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 42
($context["paragraph"] ?? null), "id", [], "method"))), 2 => ("paragraph--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 43
($context["paragraph"] ?? null), "bundle", [])))), 3 => ((        // line 44
($context["view_mode"] ?? null)) ? (((\Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(($context["paragraph"] ?? null), "bundle", []))) . "--") . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["view_mode"] ?? null))))) : (""))];
        // line 47
        echo "
";
        // line 48
        $context["document_data"] = twig_length_filter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_add_documentation_sec_doc", []), "#items", [], "array")));
        // line 49
        $context["document_items"] = [];
        // line 50
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(range(0, (($context["document_data"] ?? null) - 1)));
        foreach ($context['_seq'] as $context["key"] => $context["i"]) {
            // line 51
            echo "  ";
            $context["items"] = ["document_heading" => $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(            // line 52
($context["content"] ?? null), "field_add_documentation_sec_doc", []), $context["i"], [], "array"), "#paragraph", [], "array"), "field_documentation_doc_name", []), "value", []), "document_file" => $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(            // line 53
($context["content"] ?? null), "field_add_documentation_sec_doc", []), $context["i"], [], "array"), "#paragraph", [], "array"), "field_add_documentation_doc_file", []), "uri", [])];
            // line 56
            echo "  ";
            $context["document_items"] = twig_array_merge($this->sandbox->ensureToStringAllowed(($context["document_items"] ?? null)), [$context["key"] => ($context["items"] ?? null)]);
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['key'], $context['i'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 58
        echo "
";
        // line 59
        $this->displayBlock('paragraph', $context, $blocks);
    }

    public function block_paragraph($context, array $blocks = [])
    {
        // line 60
        echo "  ";
        $this->displayBlock('content', $context, $blocks);
    }

    public function block_content($context, array $blocks = [])
    {
        // line 61
        echo "    <div class=\"doc-list\">
      ";
        // line 62
        if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_documentation_sec_heading", [])))) {
            // line 63
            echo "        <label>";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_documentation_sec_heading", [])), "html", null, true);
            echo "</label>
      ";
        }
        // line 65
        echo "      <ul>
        ";
        // line 66
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["document_items"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["document_item"]) {
            // line 67
            echo "          <li>
            ";
            // line 68
            if ( !twig_test_empty($this->getAttribute($context["document_item"], "document_file", []))) {
                // line 69
                echo "              <a href=\"";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["document_item"], "document_file", [])), "html", null, true);
                echo "\" class=\"ic-download download documentation-link\" target=\"_blank\"></a>
            ";
            }
            // line 71
            echo "            <a href=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["document_item"], "document_file", [])), "html", null, true);
            echo "\" class =\"documentation-link\" target=\"_blank\">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["document_item"], "document_heading", [])), "html", null, true);
            echo "</a>
          </li>
        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['document_item'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 74
        echo "      </ul>
    </div>
  ";
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/paragraph/paragraph--documentation-section.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  142 => 74,  130 => 71,  124 => 69,  122 => 68,  119 => 67,  115 => 66,  112 => 65,  106 => 63,  104 => 62,  101 => 61,  94 => 60,  88 => 59,  85 => 58,  78 => 56,  76 => 53,  75 => 52,  73 => 51,  69 => 50,  67 => 49,  65 => 48,  62 => 47,  60 => 44,  59 => 43,  58 => 42,  57 => 40,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/paragraph/paragraph--documentation-section.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\paragraph\\paragraph--documentation-section.html.twig");
    }
}
