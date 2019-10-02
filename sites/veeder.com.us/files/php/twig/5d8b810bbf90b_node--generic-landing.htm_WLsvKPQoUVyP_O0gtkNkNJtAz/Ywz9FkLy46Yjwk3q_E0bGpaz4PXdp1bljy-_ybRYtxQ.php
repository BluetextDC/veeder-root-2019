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

/* themes/custom/veeder/templates/node/node--generic-landing.html.twig */
class __TwigTemplate_c414d67025bd6691de9acae94129cc2972aa9535a91b9f1f464380ed71d9c636 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 76, "if" => 89, "include" => 138];
        $filters = ["clean_class" => 78, "escape" => 87, "render" => 97, "raw" => 120, "without" => 135];
        $functions = ["file_url" => 108];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'include'],
                ['clean_class', 'escape', 'render', 'raw', 'without'],
                ['file_url']
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
        // line 76
        $context["classes"] = [0 => "node", 1 => ("node--type-" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($this->getAttribute(        // line 78
($context["node"] ?? null), "bundle", [])))), 2 => (($this->getAttribute(        // line 79
($context["node"] ?? null), "isPromoted", [], "method")) ? ("node--promoted") : ("")), 3 => (($this->getAttribute(        // line 80
($context["node"] ?? null), "isSticky", [], "method")) ? ("node--sticky") : ("")), 4 => (( !$this->getAttribute(        // line 81
($context["node"] ?? null), "isPublished", [], "method")) ? ("node--unpublished") : ("")), 5 => ((        // line 82
($context["view_mode"] ?? null)) ? (("node--view-mode-" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["view_mode"] ?? null))))) : ("")), 6 => "clearfix"];
        // line 86
        echo "
<div";
        // line 87
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method")), "html", null, true);
        echo ">
  ";
        // line 88
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_prefix"] ?? null)), "html", null, true);
        echo "
  ";
        // line 89
        if ( !($context["page"] ?? null)) {
            // line 90
            echo "    <h2";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["title_attributes"] ?? null), "addClass", [0 => "node__title"], "method")), "html", null, true);
            echo ">
      <a href=\"";
            // line 91
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["url"] ?? null)), "html", null, true);
            echo "\" rel=\"bookmark\">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["label"] ?? null)), "html", null, true);
            echo "</a>
    </h2>
  ";
        }
        // line 94
        echo "  ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["title_suffix"] ?? null)), "html", null, true);
        echo "

  ";
        // line 97
        echo "  <section class=\"generic-landing hero-section";
        if ((twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_generic_hero_image", []))) && twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_generic_hero_vimeo", []))))) {
            echo " NoHero-sec";
        }
        echo "\">
    <div class=\"inner-banner";
        // line 98
        if (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_generic_hero_vimeo", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_video_autopla", []), 0, []), "#markup", [], "array") == 0))) {
            echo " video-banner";
        }
        if (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_generic_hero_vimeo", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_video_autopla", []), 0, []), "#markup", [], "array") == 1))) {
            echo " inline-video-banner";
        }
        echo "\">
      ";
        // line 99
        if (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_generic_hero_vimeo", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_video_autopla", []), 0, []), "#markup", [], "array") == 0))) {
            // line 100
            echo "        <a href=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_generic_hero_vimeo", []), 0, []), "value", [])), "html", null, true);
            echo "\" data-fancybox class=\"c-video bg-img\"";
            if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_image_paralla", []), 0, []), "#markup", [], "array") == 1)) {
                echo " id=\"parallax\"";
            }
            echo " style=\"background: url(";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["vimeo_thumb"] ?? null)), "html", null, true);
            echo ") no-repeat center / cover;\">
          <span class=\"play-icon ic-play-icon\"></span>
        </a>
      ";
        } elseif ((( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(        // line 103
($context["content"] ?? null), "field_generic_hero_vimeo", []))) && ($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_video_autopla", []), 0, []), "#markup", [], "array") == 1)) &&  !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_generic_hero_image", []))))) {
            // line 104
            echo "        <div id=\"home-video-loader\"><img src=\"/";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, ($this->sandbox->ensureToStringAllowed(($context["base_path"] ?? null)) . $this->sandbox->ensureToStringAllowed(($context["directory"] ?? null))), "html", null, true);
            echo "/images/video-loader.gif\" alt=\"image-loader\"></div>
        <div class=\"vimeo-bg-video\">
          <iframe src=\"";
            // line 106
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_generic_hero_vimeo", []), 0, []), "value", [])), "html", null, true);
            echo "?background=1&autoplay=1&loop=1&byline=0&title=0\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
        <div class=\"bg-img mobile-banner-img\"";
            // line 108
            if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_image_paralla", []), 0, []), "#markup", [], "array") == 1)) {
                echo " id=\"parallax\"";
            }
            echo " style=\"background: url(";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), [$this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_image", []), "#items", [], "array"), "entity", []), "uri", []), "value", []))]), "html", null, true);
            echo ") no-repeat center / cover;\">
        </div>
      ";
        } elseif (( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(        // line 110
($context["content"] ?? null), "field_generic_hero_image", []))) && twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_generic_hero_vimeo", []))))) {
            // line 111
            echo "        <div class=\"bg-img\"";
            if (($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_image_paralla", []), 0, []), "#markup", [], "array") == 1)) {
                echo " id=\"parallax\"";
            }
            echo " style=\"background: url(";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, call_user_func_array($this->env->getFunction('file_url')->getCallable(), [$this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_image", []), "#items", [], "array"), "entity", []), "uri", []), "value", []))]), "html", null, true);
            echo ") no-repeat center / cover;\">
        </div>
      ";
        }
        // line 114
        echo "      <div class=\"banner-caption\" style=\"background-color: ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_generic_hero_plate_color", []), 0, []), "color", [])), "html", null, true);
        echo ";\">
        <div class=\"caption-wrap\">
          <div class=\"heading";
        // line 116
        if (twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_generic_hero_description", [])))) {
            echo " no-separator";
        }
        echo "\">
            <h1 style=\"color: #ffffff\">";
        // line 117
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_heading", []), 0, [])), "html", null, true);
        echo "</h1>
          </div>
          ";
        // line 119
        if ( !twig_test_empty($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->getAttribute(($context["content"] ?? null), "field_generic_hero_description", [])))) {
            // line 120
            echo "            <p style=\"color: #ffffff\">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute(($context["content"] ?? null), "field_generic_hero_description", []), 0, [])));
            echo "</p>
          ";
        }
        // line 122
        echo "          ";
        if ( !twig_test_empty($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_generic_hero_cta", []), 0, []), "title", []))) {
            // line 123
            echo "            <a href=\"";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_generic_hero_cta", []), 0, []), "url", [])), "html", null, true);
            echo "\" class=\"btn\" ";
            if ( !(null === $this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_generic_hero_cta", []), 0, []), "options", []), "attributes", []), "target", []))) {
                echo "target=\"";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_generic_hero_cta", []), 0, []), "options", []), "attributes", []), "target", [])), "html", null, true);
                echo "\"";
            }
            echo ">";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($this->getAttribute(($context["node"] ?? null), "field_generic_hero_cta", []), 0, []), "title", [])), "html", null, true);
            echo "</a>
          ";
        }
        // line 125
        echo "        </div>
      </div>
    </div>
  </section>

  ";
        // line 131
        echo "  <div class=\"main-content\">
    ";
        // line 132
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["content"] ?? null), "field_components", [])), "html", null, true);
        echo "

     ";
        // line 135
        echo "    ";
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->withoutFilter($this->sandbox->ensureToStringAllowed(($context["content"] ?? null)), "field_breadcrumb_color", "field_components", "field_generic_hero_cta", "field_enable_jump_nav", "field_generic_hero_description", "field_display_breadcrumbs", "field_display_contact_sidebar", "field_display_contact_footer", "field_contact_footer_form", "field_generic_hero_heading", "field_generic_hero_image", "field_generic_hero_plate_color", "field_generic_hero_vimeo", "field_generic_hero_video_autopla", "field_generic_hero_image_paralla", "field_landing_product", "field_landing_solution", "field_summary", "field_taxonomy_image", "field_product_refer_weight", "field_solution_refer_weight", "field_color_variation"), "html", null, true);
        echo "

    ";
        // line 138
        echo "    ";
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/parts/contact-footer.html.twig"), "themes/custom/veeder/templates/node/node--generic-landing.html.twig", 138)->display($context);
        // line 139
        echo "  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "themes/custom/veeder/templates/node/node--generic-landing.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  226 => 139,  223 => 138,  217 => 135,  212 => 132,  209 => 131,  202 => 125,  188 => 123,  185 => 122,  179 => 120,  177 => 119,  172 => 117,  166 => 116,  160 => 114,  149 => 111,  147 => 110,  138 => 108,  133 => 106,  127 => 104,  125 => 103,  112 => 100,  110 => 99,  101 => 98,  94 => 97,  88 => 94,  80 => 91,  75 => 90,  73 => 89,  69 => 88,  65 => 87,  62 => 86,  60 => 82,  59 => 81,  58 => 80,  57 => 79,  56 => 78,  55 => 76,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/custom/veeder/templates/node/node--generic-landing.html.twig", "E:\\inetpub\\wwwroot\\d8local.veeder.com\\themes\\custom\\veeder\\templates\\node\\node--generic-landing.html.twig");
    }
}
